import { OutputChannel, window } from 'vscode';
import { IDisposable } from './types';
import { registerDisposable } from './utils';
import * as util from 'util';

/**
 * This creates a output panel in vscode output view.
 */
export class ServerLogger implements IDisposable {
    private static output: OutputChannel;
    constructor() {
        ServerLogger.output = window.createOutputChannel('TypeScript Kernel');
        ServerLogger.output.appendLine('ServerLogger Created')
    }
    public static register() {
        registerDisposable(new ServerLogger());
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static appendLine(...params: any[]) {
        const message = util.format(params[0], ...params.slice(1));
        ServerLogger.output.appendLine(message);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static append(...params: any[]) {
        const message = util.format(params[0], ...params.slice(1));
        ServerLogger.output.append(message);
    }

    public dispose() {
        ServerLogger.output.appendLine("Closing output")
        ServerLogger.output.dispose();
    }
}
