# ClaimFound Angular Web Frontend

This documentation is for the frontend specifically. [Click here to go back to general documentation.](/docs)

## General Structure of the Application

### Components

The structure of most pages is to have a top-level component which maintains a model of the data to be used by the lower-level components. This top-level component is usually named the same as the section/module. As a general approach to navigating the structure of a page, start from this top level component and go into its HTML template. From there, you can see which components are being placed in the top level. Then you can view those components’ HTML templates to see which components they contain.

### Services

The components retrieve data from the backend using services. We have a specific service for each module, but all services inherit from the [BaseService](injectables/BaseService.html). This base service handles authentication and error handling.

### Logging

All logging is through the [LoggerService](injectables/LoggerService.html), or the [@log decorator](miscellaneous/functions.html#log).

### Error Handling

We have developed a global error handling system which consistently responds to both backend and frontend errors. All errors are parsed
into [CFErrors](classes/CFError.html) for a consistent interface regardless of the source of the error. The [CFError](classes/CFError.html)
links into error handlers to determine how to handle the error as well. Ultimately, often the an error modal will be raised [(ErrorModalComponent)](components/ErrorModalComponent.html). See the [Error Handling Guide](/docs/frontend/additional-documentation/frontend-development-guide/error-handling-guide.html) for additional details about error handling.

### Frontend Storage

To use browser LocalStorage, use the [StorageService](injectables/StorageService.html), rather than accessing it directly.

### Event Tracking

To track user events in our analytics services, use the [EventTrackerService](injectables/EventTrackerService.html). This will report
to Google Analytics, Intercom, and any other services we add in the future.

## Additional Reading

Please take a look at the [Frontend Development Guide](additional-documentation/frontend-development-guide.html) and the guides which
are nested under it.
