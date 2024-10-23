Dev Logger by SplittyIO
-----------------------

`dev-logger` is a flexible and extensible logging utility written in TypeScript. It provides both local and remote logging capabilities with support for error handling and batching. The package can be used in any TypeScript or JavaScript project, including Node.js, web applications, and React Native.

Features
--------

*   **Local Logging**: Logs to the console using `console.log`, `console.warn`, `console.info`, and `console.error`.
*   **Remote Logging**: Logs can be sent to a remote server via an API endpoint.
*   **Error Handling**: Includes retry logic for failed network requests, with configurable retry attempts.
*   **Batching**: Collects logs and sends them in batches to reduce the number of network requests.

Installation
------------

You can install this package directly from GitHub or NPM.

### Install from GitHub

    npm install git+https://github.com/splittyio/splitty-devlogger.git

### Install from NPM (if published)

    npm install dev-logger

Usage
-----

The package provides two types of loggers: a local logger (`dev`) and a remote logger (`remote`). Both loggers implement the same interface, making it easy to switch between them.

### Importing the Loggers

    import { dev, remote } from 'dev-logger';

### Local Logging

    dev.log('This is a local log message');
    dev.warn('This is a local warning');
    dev.info('This is some local info');
    dev.error('This is a local error');

### Remote Logging

The remote logger sends logs to a specified API endpoint. By default, logs are batched and sent every 5 seconds or once the batch size reaches 10.

    remote.log('This is a log message that will be sent to the server');
    remote.warn('This warning will be sent to the server');
    remote.error('This error will be sent to the server');

### Configuration

You can configure the remote logger by specifying the following options when creating an instance:

*   `endpoint`: The API URL where logs will be sent.
*   `batchSize`: The number of logs to collect before sending them (default: 10).
*   `batchInterval`: The interval (in milliseconds) at which logs are sent (default: 5000 ms).
*   `maxRetries`: The number of retry attempts for failed log requests (default: 3).

Example:

    import { RemoteLogger } from 'dev-logger';
    
    const customLogger = new RemoteLogger('https://my.custom.api/logging', 5, 2000, 3);
    
    // Use the custom logger
    customLogger.log('This log will be sent in batches of 5, every 2 seconds');

Error Handling
--------------

The remote logger comes with built-in error handling. If a log request fails, it will retry sending the logs up to the configured number of retries (`maxRetries`). If all retry attempts fail, the logs will be re-added to the queue, and the logger will attempt to send them in the next batch.

    remote.error('An error occurred and
    will be retried if the network is unavailable');

Batching
--------

Logs are batched to reduce the number of network requests. The logs are sent either when:

*   The number of logs reaches the `batchSize`.
*   The `batchInterval` (time between sending logs) expires.

You can configure these options based on your needs.

### Example with Batching

    remote.log('This log will be
    batched and sent in a group with other logs');
    remote.warn('Another batched log');
    remote.info('Logs are sent in intervals or once the batch size is met');

Advanced Features
-----------------

### Customizing Retry Logic

You can adjust the retry logic by setting the `maxRetries` parameter in the `RemoteLogger` constructor.

    const loggerWithRetries = new
    RemoteLogger('https://my.api/logging', 10, 5000, 5); // 5 retries

### Stop Batching Manually

You can stop the batching timer manually if needed using `stopBatching`.

    const logger = new
    RemoteLogger('https://my.api/logging');
    logger.stopBatching(); // Manually stop sending logs in batches

Contributing
------------

Feel free to submit issues, create pull requests, or fork the repository to add new features.

1.  Fork the repository
2.  Create a new branch (`git checkout -b feature-branch`)
3.  Make your changes and commit (`git commit -m ' Add some feature'`)
4.  Push to the branch (`git push origin feature-branch`)
5.  Open a pull request

License
-------

This project is licensed under the MIT License - see the `LICENSE` file for details.
