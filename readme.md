
<h2>Dev Logger by SplittyIO</h2><p><code>dev-logger</code> is a flexible and extensible logging utility written in 
TypeScript. It
    provides both local and remote logging capabilities with support for error handling and batching. The package can be
    used in any TypeScript or JavaScript project, including Node.js, web applications, and React Native.</p><h2>
    Features</h2>
<ul>
    <li><strong>Local Logging</strong>: Logs to the console using <code>console.log</code>, <code>console.warn</code>,
        <code>console.info</code>, and <code>console.error</code>.
    </li>
    <li><strong>Remote Logging</strong>: Logs can be sent to a remote server via an API endpoint.</li>
    <li><strong>Error Handling</strong>: Includes retry logic for failed network requests, with configurable retry
        attempts.
    </li>
    <li><strong>Batching</strong>: Collects logs and sends them in batches to reduce the number of network requests.
    </li>
</ul><h2>Installation</h2><p>You can install this package directly from GitHub or NPM.</p><h3>Install from GitHub</h3>
<pre><code>npm install git+https://github.com/splittyio/dev-logger.git</code></pre><h3>Install from NPM (if
    published)</h3>
<pre><code>npm install dev-logger</code></pre><h2>Usage</h2><p>The package provides two types of loggers: a local logger
    (<code>dev</code>) and a remote logger (<code>remote</code>). Both loggers implement the same interface, making it
    easy to switch between them.</p><h3>Importing the Loggers</h3>
<pre><code>import { dev, remote } from 'dev-logger';</code></pre><h3>Local Logging</h3>
<pre><code>dev.log('This is a local log message');
dev.warn('This is a local warning');
dev.info('This is some local info');
dev.error('This is a local error');</code></pre><h3>Remote Logging</h3><p>The remote logger sends logs to a specified
    API endpoint. By default, logs are batched and sent every 5 seconds or once the batch size reaches 10.</p>
<pre><code>remote.log('This is a log message that will be sent to the server');
remote.warn('This warning will be sent to the server');
remote.error('This error will be sent to the server');</code></pre><h3>Configuration</h3><p>You can configure the remote
    logger by specifying the following options when creating an instance:</p>
<ul>
    <li><code>endpoint</code>: The API URL where logs will be sent.</li>
    <li><code>batchSize</code>: The number of logs to collect before sending them (default: 10).</li>
    <li><code>batchInterval</code>: The interval (in milliseconds) at which logs are sent (default: 5000 ms).</li>
    <li><code>maxRetries</code>: The number of retry attempts for failed log requests (default: 3).</li>
</ul><p>Example:</p>
<pre><code>import { RemoteLogger } from 'dev-logger';

const customLogger = new RemoteLogger('https://my.custom.api/logging', 5, 2000, 3);

// Use the custom logger
customLogger.log('This log will be sent in batches of 5, every 2 seconds');</code></pre><h2>Error Handling</h2><p>The
remote logger comes with built-in error handling. If a log request fails, it will retry sending the logs up to the
configured number of retries (<code>maxRetries</code>). If all retry attempts fail, the logs will be re-added to the
queue, and the logger will attempt to send them in the next batch.</p>
<pre><code>remote.error('An error occurred and
will be retried if the network is unavailable');</code></pre><h2>Batching</h2><p>Logs are batched to reduce the number
    of network requests. The logs are sent either when:</p>
<ul>
    <li>The number of logs reaches the <code>
        batchSize</code>.
    </li>
    <li>The <code>batchInterval</code> (time between sending logs) expires.</li>
</ul><p>You can
    configure these options based on your needs.</p><h3>Example with Batching</h3>
<pre><code>remote.log('This log will be
batched and sent in a group with other logs');
remote.warn('Another batched log');
remote.info('Logs are sent in intervals or once the batch size is met');</code></pre><h2>Advanced Features</h2><h3>
    Customizing Retry Logic</h3><p>You can adjust the retry logic by setting the <code>maxRetries</code> parameter in
    the <code>RemoteLogger</code> constructor.</p>
<pre><code>const loggerWithRetries = new
RemoteLogger('https://my.api/logging', 10, 5000, 5); // 5 retries</code></pre><h3>Stop Batching Manually</h3><p>You can
    stop the batching timer manually if needed using <code>stopBatching</code>.</p>
<pre><code>const logger = new
RemoteLogger('https://my.api/logging');
logger.stopBatching(); // Manually stop sending logs in batches</code></pre><h2>Contributing</h2><p>Feel free to submit
    issues, create pull requests, or fork the repository to add new features.</p>
<ol>
    <li>Fork the repository</li>
    <li>Create
        a new branch (<code>git checkout -b feature-branch</code>)
    </li>
    <li>Make your changes and commit (<code>git commit -m '
        Add some feature'</code>)
    </li>
    <li>Push to the branch (<code>git push origin feature-branch</code>)</li>
    <li>Open a pull
        request
    </li>
</ol><h2>License</h2><p>This project is licensed under the MIT License - see the <code>LICENSE</code> file
    for details.</p>
