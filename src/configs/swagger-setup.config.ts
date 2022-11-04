import { SwaggerCustomOptions, SwaggerDocumentOptions } from '@nestjs/swagger';

export const getSwaggerSetupConfig = () => {
  return {
    customSiteTitle: 'Calendar API Swagger - Codelitt',
    customfavIcon: 'https://www.codelitt.com/favicon.ico',
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: function (methodA: any, methodB: any) {
        const order = { post: '0', get: '1', patch: '2', put: '3', delete: '4' };
        return order[methodA._root.entries[1][1]].localeCompare(order[methodB._root.entries[1][1]]);
      },
      docExpansion: 'list',
      displayRequestDuration: true,
      syntaxHighlight: { theme: 'monokai' },
      tryItOutEnabled: true,
      requestSnippetsEnabled: true,
      persistAuthorization: true,
    },
  } as Partial<SwaggerCustomOptions>;
};

export const getSwaggerDocumentConfig = () => {
  return {
    operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey,
    deepScanRoutes: true,
  } as Partial<SwaggerDocumentOptions>;
};

export const getSwaggerDescription = () => {
  return (
    '<h2 id="using-codelitt-s-calendar-api">Using Codelitt&#39;s Calendar API</h2>' +
    '<p>To use the Codelitt&#39;s Calendar API, follow these steps:</p>' +
    '<ul>' +
    '<li><p>Use the following URL to make requests through the Swagger Documentation: <a href="https://api.calendar.codelitt.dev/docs">Codelitt&#39;s Calendar API - Swagger</a>;</p>' +
    '</li>' +
    '<li><p>Use the following Base URL to make requests through your application:</p>' +
    '<ul>' +
    '<li><a href="https://api.calendar.codelitt.dev/"><code>https://api.calendar.codelitt.dev/</code></a></li>' +
    '</ul>' +
    '</li>' +
    '<li><p>Create a new authentication token using the <a href="https://api.calendar.codelitt.dev/docs#/Tokens/create"><code>/tokens POST</code></a> endpoint through Swagger:</p>' +
    '<ul>' +
    '<li><p>The token only needs to be created once, it is a user&#39;s choice to create more tokens;</p>' +
    '</li>' +
    '<li><p>The <code>name</code> field on the request body is an optional field, the token can be created without it;</p>' +
    '</li>' +
    '<li><p>After changing the request body payload to the desired value, execute the request by clicking on the <code>Execute</code> button;</p>' +
    '</li>' +
    '<li><p>On the response body, the <code>id</code> field represents the authentication token ;</p>' +
    '</li>' +
    '<li><p>The authentication token should be stored as an Environment Variable on your application;</p>' +
    '</li>' +
    '<li><p>Use the authentication token on the <a href="https://www.uuidgenerator.net/version4">UUID v4</a> format to make further requests;</p>' +
    '</li>' +
    '</ul>' +
    '</li>' +
    '<li><p>Create a reminder using the <a href="https://api.calendar.codelitt.dev/docs#/Reminders/create"><code>/reminders POST</code></a> endpoint, remember to inform the authentication token on the request body;</p>' +
    '</li>' +
    '<li><p>Get and Manage the reminders by passing the authentication token on the URL of each Reminder method (<a href="https://api.calendar.codelitt.dev/docs#/Reminders/findRemindersNotificationsByMonth">GET</a>, <a href="https://api.calendar.codelitt.dev/docs#/Reminders/update">PATCH</a>, <a href="https://api.calendar.codelitt.dev/docs#/Reminders/remove">DELETE</a>).</p>' +
    '</li>' +
    '</ul>'
  );
};
