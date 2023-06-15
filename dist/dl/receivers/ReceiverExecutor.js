"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const LoggerUtil_1 = require("../../util/LoggerUtil");
const FullRepairReceiver_1 = require("./FullRepairReceiver");
const log = LoggerUtil_1.LoggerUtil.getLogger('ReceiverExecutor');
log.info('Receiver process started.');
const manifest = {
    FullRepairReceiver: () => new FullRepairReceiver_1.FullRepairReceiver()
};
const targetReceiver = process.argv[2];
if (!Object.prototype.hasOwnProperty.call(manifest, targetReceiver)) {
    log.error(`Unknown receiver '${targetReceiver}', shutting down..`);
    process.exit(1);
}
const receiver = manifest[targetReceiver]();
process.on('message', async (message) => {
    try {
        await receiver.execute(message);
    }
    catch (err) {
        log.error('Error During Receiver Operation');
        log.error(err);
        let displayable = undefined;
        try {
            log.error('Asking the reciever for more details (if available):');
            displayable = await receiver.parseError(err);
            if (displayable) {
                log.error(`Receiver replied with ${displayable}`);
            }
            else {
                log.error('The receiver could not parse the error.');
            }
        }
        catch (fixme) {
            log.error('The reciever\'s error parser threw also, this is a bug and should be reported.', fixme);
        }
        // Our winston logger only outputs to stdout, so this works.
        // Write directly to stdout and await stdout flush.
        (0, fs_1.writeSync)(process.stdout.fd, 'Error now being propagated back to the transmitter.');
        (0, fs_1.fsyncSync)(process.stdout.fd);
        process.send({
            response: 'error',
            displayable
        });
        // Current executor behavior is to terminate on first error.
        // In theory, if an unhandled error reaches here the process failed.
        // Errors that should not crash the process should be handled before it gets to this point.
        process.exit(1);
    }
});
// Dump issues to the console.
process.on('unhandledRejection', r => console.log(r));
process.on('disconnect', () => {
    log.info('Disconnect singal received, shutting down.');
    process.exit(0);
});
