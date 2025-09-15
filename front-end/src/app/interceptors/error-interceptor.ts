import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";

import { customErrorMessages } from "@app/models/error/custom-error-messages";
import { ErrorDetails } from "@app/models/error/error-details";
import { HTTP_ERROR_STATUS } from "@app/models/error/http-error-status";
import { TOAST_SEVERITY } from "@app/models/toast/toast-severity";
import { MessageService } from "primeng/api";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    private readonly messageService: MessageService = inject(MessageService);

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((httpErrorResponse: HttpErrorResponse) => {
                if (httpErrorResponse.status && httpErrorResponse.status >= 400) {
                    const errorDetails: ErrorDetails = httpErrorResponse?.error?.customError;
                    if (errorDetails && errorDetails.errorCode) {
                        let message = customErrorMessages.get(errorDetails.errorCode);
                        if (errorDetails.errorMessage) {
                            message = errorDetails.errorMessage
                        }
                        this.messageService.add({ severity: TOAST_SEVERITY.error, summary: message })
                    } else if (httpErrorResponse.status === HTTP_ERROR_STATUS.unauthorized.errorCode) {
                        this.messageService.add({
                            severity: TOAST_SEVERITY.error,
                            summary: HTTP_ERROR_STATUS.unauthorized.errorMessage
                        });
                    } else if (httpErrorResponse.status === HTTP_ERROR_STATUS.forbidden.errorCode) {
                        this.messageService.add({
                            severity: TOAST_SEVERITY.error,
                            summary: HTTP_ERROR_STATUS.forbidden.errorMessage
                        });
                    } else {
                        this.messageService.add({
                            severity: TOAST_SEVERITY.error,
                            summary: 'An error occurred'
                        });
                    }
                }
                throw httpErrorResponse;
            })
        );
    }
}
