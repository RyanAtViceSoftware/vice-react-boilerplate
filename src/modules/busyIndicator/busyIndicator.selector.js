import { STATE_NAME } from "./busyIndicator.constants";

export const isBusy = state => state[STATE_NAME].busyCount > 0;
