import { ACTION_TYPE_PREFIX } from "../../config";

export const STARTED = `${ACTION_TYPE_PREFIX}/wizard/STARTED`;
export const NEXT_CLICKED = `${ACTION_TYPE_PREFIX}/wizard/NEXT_CLICKED`;
export const DONE_CLICKED = `${ACTION_TYPE_PREFIX}/wizard/DONE_CLICKED`;
export const BACK_CLICKED = `${ACTION_TYPE_PREFIX}/wizard/BACK_CLICKED`;
export const CANCEL_CLICKED = `${ACTION_TYPE_PREFIX}/wizard/CANCEL_CLICKED`;
export const REQUIRES_VALIDATION = `${ACTION_TYPE_PREFIX}/wizard/REQUIRES_VALIDATION`;
export const FINISHED_DISPOSING = `${ACTION_TYPE_PREFIX}/wizard/FINISHED_DISPOSING`;
export const OTHER_PAGE_NOT_VALID = `${ACTION_TYPE_PREFIX}/wizard/OTHER_PAGE_NOT_VALID`;
export const CURRENT_PAGE_NOT_VALID = `${ACTION_TYPE_PREFIX}/wizard/CURRENT_PAGE_NOT_VALID`;
export const VALID = `${ACTION_TYPE_PREFIX}/wizard/VALID`;
export const INITIALIZED = `${ACTION_TYPE_PREFIX}/wizard/INITIALIZED`;
export const RESET = `${ACTION_TYPE_PREFIX}/wizard/RESET`;
export const CAN_TRANSITION = `${ACTION_TYPE_PREFIX}/wizard/CAN_TRANSITION`;
export const VALIDATING = `${ACTION_TYPE_PREFIX}/wizard/VALIDATING`;

// For wizard data reducer errorActions - future impl for inital values
export const SET_WIZARD_DATA = `${ACTION_TYPE_PREFIX}/wizard/SET_WIZARD_STATE`;
export const RESET_WIZARD_DATA = `${ACTION_TYPE_PREFIX}/wizard/RESET_WIZARD_DATA`;
