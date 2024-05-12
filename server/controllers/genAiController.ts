import createAI from '@server/utils/aiFactory';
import { createError } from '@/server/middleware/errorHandling';
import TreePrompts from '@/server/models/TreePromptsModel';
import { isType } from '@server/utils/typeChecker';
import { AIProvider } from '@server/types/index';

import { LinktaFlow, UserInput, User } from '@/server/models/Schemas';

import type { Request, Response, NextFunction } from 'express';
import type {
  GenerativeAIModel,
  ChainOfThought,
  TreePromptsFunction,
} from '@server/types/index';

const dummyUserId = '663d2cd5b573a748b7f66e85';

class GenAIController {
  AI: AIProvider;
  defaultPromptMethod: TreePromptsFunction;

  constructor() {
    this.AI = AIProvider.Gemini;
    this.defaultPromptMethod = TreePrompts.costar;

    this.generateResponse = this.generateResponse.bind(this);
    this.generateTree = this.generateTree.bind(this);
    this.createConnection = this.createConnection.bind(this);
    this.queryTree = this.queryTree.bind(this);
  }

  /**
   * Generate a response from the AI.
   * The response is stored in res.locals.response
   *
   * @param req The request object
   * @param res The response object
   * @param next The next function in the middleware chain
   * @return void
   */
  async generateResponse(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const prompt = req.body.prompt;

    try {
      const AIConnection = this.createConnection(this.AI);

      const response = await AIConnection.generateResponse(prompt);

      res.locals.response = response;
      return next();
    } catch (err: unknown) {
      const methodError = createError(
        'generateResponse',
        'genAiController',
        'Error generating response from AI.',
        err
      );
      return next(methodError);
    }
  }

  /**
   * Generate a tree from the AI.
   * The generated tree is stored in res.locals.tree
   *
   * @param req The request object
   * @param res The response object
   * @param next The next function in the middleware chain
   * @return void
   */
  async generateTree(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userPrompt = req.body.prompt;
    //create userinput doc and return document id, then pass into linktaflow doc creation process
    const userInputId = await UserInput.create({ input: userPrompt });
    try {
      const response = await this.queryTree(userPrompt);

      //store LLM generated response into linktaflows collection in DB
      const parsedResponse = JSON.parse(response);

      const { nodes, edges } = parsedResponse;
      console.log('parsedRes...', parsedResponse);

      const linktaFlowData = {
        nodes: nodes,
        edges: edges,
        userInputId: userInputId._id.toString(),
        userId: dummyUserId,
      };
      console.log('linktaflowdata: ->', linktaFlowData);

      const linktaFlowId = await LinktaFlow.create(linktaFlowData);
      const treeId = linktaFlowId._id.toString();
      
      //once linktaFlow doc is successfully added to DB, update linktaflowId to user's linktaflows[] property
      await User.findByIdAndUpdate(dummyUserId, {
        $push: { linktaFlows: treeId },
      }); //need to be tested
      res.locals.tree = response; //send respsonse - {nodes: [{}], edges: [{}]} in JSON format
      //send linktaflow doc/tree Id back to front end
      res.locals.treeId = treeId;
      return next();
    } catch (err: unknown) {
      const methodError = createError(
        'generateTree',
        'genAiController',
        'Error generating response from AI.',
        err
      );

      return next(methodError);
    }
  }

  /**
   * Create a connection to an AI API
   *
   * @param AI The type of AI to connect to
   */
  createConnection(AI: AIProvider): GenerativeAIModel {
    const AIConnection = createAI(AI);

    return AIConnection;
  }

  /**
   * Query the AI to build a tree
   *
   * @param userPrompt The prompt from the user
   * @param promptMethod (optional) The method to use to generate the prompt
   * @return The response from the AI
   */
  async queryTree(
    userPrompt: string,
    promptMethod?: TreePromptsFunction
  ): Promise<string> {
    const AI = this.createConnection(this.AI);

    if (!promptMethod) {
      promptMethod = this.defaultPromptMethod;
    }

    const prompt = promptMethod(userPrompt);

    if (typeof prompt === 'object') {
      /**
       *  Types cannot be arguments because they are not available at runtime
       * We create a dummy object of the appropriate type to check the type
       * While we only use this once, I have created this so that we can
       * expand the types in the future if the AI API changes.
       */
      const chainOfThought: ChainOfThought = { history: [], prompt: '' };
      if (isType(prompt, chainOfThought)) {
        return AI.generateConversation(prompt.history, prompt.prompt);
      }
    }

    // We cast as string as this is our default return.
    return AI.generateResponse(prompt as string);
  }
}

const genAIController = new GenAIController();
export default genAIController;
