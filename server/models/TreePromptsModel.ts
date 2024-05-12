import type { InputContent } from '@google/generative-ai';
import type { ChainOfThought } from '@/server/types';

/**
 * Class for generating prompts for the LLM.
 * Each method uses a different style of prompting and encorporates the user's prompt.
 * The use of multiple methods allows for testing as LLMs develop, and for automation
 * of testing to determine which method generates the most usable result.
 */
const TreePrompts = {
  /**
   * Generate a prompt using the one-shot method.
   * Note, I have struggled to engineer a good prompt for this one.
   *
   * @param prompt The user's prompt
   * @return The one-shot prompt for the LLM
   */
  oneShot(prompt: string): string {
    return `
    Skill: {
      "Skill Name": {
        "subtopic1": ["area1", "area2", "area3"],
        "subtopic2": ["area1", "area2", "area3"]
      }
    }
    
    ${prompt}
    `;
  },

  /**
   * Generate a prompt using the zero-shot method.
   *
   * @param prompt The user's prompt
   * @return The zero-shot prompt for the LLM
   */
  zeroShot(prompt: string): string {
    return `
    You are a computer outputting only JSON. You build a JSON file with the first
    key the name of the subject, it's value an object of subtopic keys, and each
    each subtopic key having an array of areas to study. Build this JSON file with the
    following prompt: ${prompt}
    `;
  },

  /**
   * Generate a history and final prompt for use in simulating a conversation.
   *
   * @param prompt The user's prompt
   * @return The history and final prompt for the LLM
   */
  chainOfThought(prompt: string): ChainOfThought {
    const thoughtLine: InputContent[] = [
      {
        role: 'user',
        parts: [
          { text: 'I am a student looking to learn about a new skill.' },
          {
            text: 'I am building a tree to organize the information I need to learn.',
          },
          {
            text: 'That looks good. I just want the JSON object, no extra text.',
          },
        ],
      },
      {
        role: 'model',
        parts: [
          { text: 'I can help you with that.' },
          {
            text: `Does a structure like this work for you? {
             "skill" : { "subtopic1" : ["area1", "area2"], "subtopic2": ["area3", "area4"]`,
          },
          { text: 'Great to hear. What skill are you looking to learn about?' },
        ],
      },
    ];

    return {
      history: thoughtLine,
      prompt: prompt,
    };
  },

  /**
   * Generate a prompt using the COSTAR method.
   *
   * @param prompt The user's prompt
   * @returns The COSTAR prompt for the LLM
   */
  costar(prompt: string): string {
    return `
    # CONTEXT #
    You are an advanced artificial intelligence system, a tool that I can use to help me learn visually. Since I want to digest and learn information quickly, I need your assistance in visualizing various subjects, including paragraphs, full articles, topics, study plans, and more. Your capabilities are not limited to any particular format or type of content.

    #######

    # Objective #
    First, create a tree-like data structure using nodes, where each node represents a subject. Assign a unique ‘id’ to each node based on its level in the tree, and include a ‘data’ property containing a maximum of three keywords that describe the subject. Here is an example node structure: { id: ‘node1’, data: { label: ‘Software Engineering’ }, children: [ { id: ‘node1.1’, data: { label: ‘Programming Languages’ }, children: [ { id: ‘node1.1.1’, data: { label: ‘Java’ } }, { id: ‘node1.1.2’, data: { label: ‘Python’ } }, { id: ‘node1.1.3’, data: { label: ‘JavaScript’ } } ] }, { id: ‘node1.2’, data: { label: ‘Software Design Patterns’ }, children: [ { id: ‘node1.2.1’, data: { label: ‘Object-Oriented Design’ } }, { id: ‘node1.2.2’, data: { label: ‘Functional Programming’ } }, { id: ‘node1.2.3’, data: { label: ‘Architectural Patterns’ } } ] }, { id: ‘node1.3’, data: { label: ‘Software Testing’ }, children: [ { id: ‘node1.3.1’, data: { label: ‘Unit Testing’ } }, { id: ‘node1.3.2’, data: { label: ‘Integration Testing’ } }, { id: ‘node1.3.3’, data: { label: ‘Performance Testing’ } } ] } ] }
    Secondly, convert the generated tree-like data structure into React Flow’s nodes and edges array. 
    Return your response in the exact object format following the example below with no extra information, and Do Not Use Markdown (such as, **Nodes** and **Edges**): 
    '{"nodes":[{"id":"1","type":"input","data":{"label":"System Design"},"position":{"x":0,"y":0}},{"id":"2","data":{"label":"Principles"},"position":{"x":0,"y":0}},{"id":"3","data":{"label":"Patterns"},"position":{"x":0,"y":0}},{"id":"4","data":{"label":"Scalability"},"position":{"x":0,"y":0}},{"id":"5","data":{"label":"Reliability"},"position":{"x":0,"y":0}},{"id":"6","data":{"label":"MVC"},"position":{"x":0,"y":0}},{"id":"7","data":{"label":"Microservices"},"position":{"x":0,"y":0}}],"edges":[{"id":"e1-2","source":"1","target":"2","type":"smoothstep"},{"id":"e1-3","source":"1","target":"3","type":"smoothstep"},{"id":"e2-4","source":"2","target":"4","type":"smoothstep"},{"id":"e2-5","source":"2","target":"5","type":"smoothstep"},{"id":"e3-6","source":"3","target":"6","type":"smoothstep"},{"id":"e3-7","source":"3","target":"7","type":"smoothstep"}]}'
    
    #######

    # Style #
    A very knowledgable teacher and researcher who can provide neccessary and detailed information to the subjects.

    #######

    # Tone #
    Friendly.

    #######

    # Audience #
    An adult learner.

    #######

    # Response Format #
    Return result in one continues line with no line breaking in JSON format including one object contains two propeties: nodes and edges, which are two arries of React Flow objects; Do Not Use Markdown; 

    #######

    Goal: ${prompt}
    `;
  },
};

export default TreePrompts;
