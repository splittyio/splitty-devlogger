import {RemoteLogger} from './remoteLogger';
import { DevLogger } from './devLogger';

// Create a singleton instance of DevLogger
export const dev = new DevLogger();
export const remote = new RemoteLogger();
