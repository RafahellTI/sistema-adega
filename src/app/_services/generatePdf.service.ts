import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratePdfService {

constructor() { }
/*
downloadPDF():any{
  return this.http.get(uri, { headers: this.Header() })
             .map((response: Response) => {
                 const mediaType = 'application/pdf';
                return new Blob([response._body], {type: mediaType});

             }).catch();
              }

}*/}
