# Obsolete
Must currently use npm.

npm warn deprecated @types/fast-json-stable-stringify@2.1.0: This is a stub types definition. fast-json-stable-stringify provides its own type definitions, so you do not need this installed.
npm warn deprecated read-package-json@2.1.2: This package is no longer supported. Please use @npmcli/package-json instead.
npm warn deprecated npmlog@5.0.1: This package is no longer supported.
npm warn deprecated har-validator@5.1.5: this library is no longer supported
npm warn deprecated abab@2.0.6: Use your platform's native atob() and btoa() methods instead
npm warn deprecated are-we-there-yet@2.0.0: This package is no longer supported.
npm warn deprecated domexception@2.0.1: Use your platform's native DOMException instead
npm warn deprecated w3c-hr-time@1.0.2: Use your platform's native performance.now() and performance.timeOrigin.
npm warn deprecated gauge@3.0.2: This package is no longer supported.
npm warn deprecated xterm-addon-serialize@0.11.0: This package is now deprecated. Move to @xterm/addon-serialize instead.
npm warn deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm warn deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
npm warn deprecated xterm@5.3.0: This package is now deprecated. Move to @xterm/xterm instead.
npm warn deprecated core-js@1.2.7: core-js@<3.23.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Some versions have web compatibility issues. Please, upgrade your dependencies to the actual version of core-js.

# TODO
1. Use tsconfig from users workspace folder, closest to the ipynb file.
3. Interactive widow will be a great addition
4. Better way to view image tensors (helper to generate images & probably zoom in - or just use Jupyter's tensor visualizer)
5. Variable viewer? or tensor viewer or easy image viewer (from tensors)?
6. Changing cwd permanently in shells? (probably not)
7. Cell magics (to change CWD, send variable from node to browser)?
8. Use shell path from vscode settings
Ignore language (doesn't matter whether its shell or powershell).
At the end of the day the shell is setup by the user.
11. tfjs-vis, Use a webview instead of a Panel, as the state is not preserved & its not tied to a particular notebook.
    This way we can open the new webview on the side.
12. Use ESBuild for extension (excluding `node-pty`, that's better bundled & shipped in node_modules folder, this way the bundle will pick it)
13. Fix prettier, etc
14. Links in error output
15. Tests

# Bugs
* Enable `supportBreakingOnExceptionsInDebugger`
    For break point exceptions
* Fix stack traces in exceptions

* Following code fails
```
console.log(typeof some)
var {x}={x:'xyz1234'},y,some = ' ',([a,b]=[1,2]);
doIt();
```

* When debugging, we do'nt see variables
* Should wrap every cell in an IIFE, so we can see variables as variables.
* Display message if we fail to start node process (currently just hangs)
* Magics must be excluded from being executed as JS code (else parser will fall over & hang)

# Telemetry
* See whether we need variable hoisting
(easy, parse the code & check if we have classes/functions)
* Variable hoisting
    * At worst, we notify users that this will not work when debugging (yuck)
    * Or we open a dummy cell & start debugging that code (yuck)



# Known issues
* Hoisting is always an issue (after all its just hacky, we're changing user code)
* Printing value of last expression vs `console.log`
See below
```typescript
    var s = await Promise.resolve(1);
    function bye(){
        console.log("Bye");
    }
    bye();
    s
```
When you run this, the value `1` will be displayed first and then we'll see `Bye`.
This is because we get output from repl before we get output from stdout of the process.
** SOLUTION **
* After we get the result from the repl, we can send a `console.log(<GUID>)`, this will
tell the UI that we have some output that will be coming.
Next we sent out result via websockets. We should not display the output we got from the socket
until we've received the `<GUID>` from `process.stdout`, once we wait, we know any `console.log` the
user sent would have been received & printed in the right order.
Thus if we look at the above example, the output would be in the right order as follows:
```
Bye
1
```

