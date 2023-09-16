# Echo JS DApp

This example represents a minimalistic Cartesi Rollups application that simply copies (or "echoes") each input received as a corresponding output notice. This DApp's back-end is written in JavaScript.

## Interacting with the application

We can use the [frontend-console](../frontend-console) application to interact with the DApp.
Ensure that the [application has already been built](../frontend-console/README.md#building) before using it.

First, go to a separate terminal window and switch to the `frontend-console` directory:

```shell
cd frontend-console
```

Then, send an input as follows:

```shell
yarn start input send --payload "Hello there"
```

In order to verify the notices generated by your inputs, run the command:

```shell
yarn start notice list
```

The payload of the notice should be `"Hello there"`.

## Running the back-end in host mode

When developing an application, it is often important to easily test and debug it. For that matter, it is possible to run the Cartesi Rollups environment in [host mode](../README.md#host-mode), so that the DApp's back-end can be executed directly on the host machine, allowing it to be debugged using regular development tools such as an IDE.

This DApp's back-end is written in JavaScript and expects Node.js version 18 or higher to be available in the host machine.

In order to start the back-end, run the following commands in a dedicated terminal:

```shell
cd echo-js/
yarn
yarn start
```

The final command will effectively run the back-end and send corresponding outputs to port `5004`.
It can optionally be configured in an IDE to allow interactive debugging using features like breakpoints.

You can also use a tool like [entr](https://eradman.com/entrproject/) to restart the back-end automatically when the code changes. For example:

```shell
ls *.js | entr -r yarn start
```

After the back-end successfully starts, it should print an output like the following:

```log
HTTP rollup_server url is http://127.0.0.1:5004
Sending finish
```

After that, you can interact with the application normally [as explained above](#interacting-with-the-application).