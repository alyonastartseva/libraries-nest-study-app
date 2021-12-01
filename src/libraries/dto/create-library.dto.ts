export class CreateLibraryDto {
  
  readonly name: string;
  readonly locale: string;
  readonly address: string;
  readonly organizationName?: string;
  readonly description?: string;

}