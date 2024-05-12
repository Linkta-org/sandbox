import { Schema, model } from 'mongoose';
import type {
  UserType,
  LinktaFlowType,
  UserInputType,
} from '@/server/types/shcemaTypes';
// import { User } from 'firebase/auth';

const userSchema: Schema<UserType> = new Schema(
  {
    firstName: {
      type: String,
      //optional fields for future consideration
      required: true,
      minLength: 3,
      maxLength: 30,
      trim: true,
    },
    lastName: {
      type: String,
    },
    linktaFlows: [
      {
        type: Schema.Types.ObjectId,
        ref: 'LinktaFlow',
      },
    ],
  },
  { timestamps: true }
);

const userInputSchema: Schema<UserInputType> = new Schema(
  {
    input: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const linktaFlowSchema: Schema<LinktaFlowType> = new Schema({
  nodes: [
    {
      id: String,
      type: { type: String },
      position: { x: Number, y: Number },
      data: { label: String },
      style: {}, // Adjust to store CSSProperties object
      className: String,
      hidden: Boolean,
      selected: Boolean,
      draggable: Boolean,
      dragging: Boolean,
      selectable: Boolean,
      connectable: Boolean,
      deletable: Boolean,
      dragHandle: String,
      width: { type: Number, required: false },
      height: { type: Number, required: false },
      parentId: { type: String, required: false },
      zIndex: Number,
      extent: { type: String, enum: ['parent', null], required: false },
      expandParent: Boolean,
      sourcePosition: {
        type: String,
        enum: ['left', 'right', 'top', 'bottom'],
        required: false,
      },
      targetPosition: {
        type: String,
        enum: ['left', 'right', 'top', 'bottom'],
        required: false,
      },
      ariaLabel: String,
      focusable: Boolean,
      resizing: Boolean,
    },
  ],
  edges: [
    {
      id: String,
      source: String,
      target: String,
      type: { type: String, required: false },
      sourceHandle: { type: String, required: false },
      targetHandle: { type: String, required: false },
      style: {}, // Adjust to store CSSProperties object
      animated: Boolean,
      hidden: Boolean,
      deletable: Boolean,
      className: String,
      selected: Boolean,
      zIndex: Number,
      ariaLabel: String,
      focusable: Boolean,
      // Label options
      label: { type: String, required: false },
      labelStyle: {}, // Adjust to store CSSProperties object
      labelShowBg: Boolean,
      labelBgStyle: {}, // Adjust to store CSSProperties object
      labelBgPadding: { type: [Number], required: false },
      labelBgBorderRadius: Number,
      // Specific to SmoothStep and Bezier edge types
      pathOptions: {
        type: Map,
        of: new Schema(
          {
            offset: { type: Number, required: false },
            borderRadius: { type: Number, required: false },
            curvature: { type: Number, required: false },
          },
          { _id: false, strict: false }
        ),
      },
    },
  ],
  userInputId: { type: Schema.Types.ObjectId, ref: 'UserInput' },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const User = model('User', userSchema);
const LinktaFlow = model('LinktaFlow', linktaFlowSchema);
const UserInput = model('UserInput', userInputSchema);

export { User, LinktaFlow, UserInput };
