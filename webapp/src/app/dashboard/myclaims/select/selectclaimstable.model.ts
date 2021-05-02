export class SelectClaimsTableRow {
  amount: number;
  claimId: string;
  names: string[];
  state: string;
  addresses: string[];
  reportingCompany: string;
  private _isSelected: boolean;
  get isSelected(): boolean {
    return this._isSelected;
  }
  set isSelected(value: boolean) {
    this.updating = false;
    this._isSelected = value;
  }

  updating: boolean = false;



  constructor(args: SelectClaimsTableRowArgs) {
    this.claimId = args.claimId;
    this.amount = args.amount;
    this.addresses = args.addresses;
    this.names = args.names;
    this.reportingCompany = args.reportingCompany;
    this.state = args.state;
    this.isSelected = args.isSelected;
  }

  get formattedAmount(): string {
    return this.amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  }

  get concatenatedNames() {
    return this._combineWithAmpersand(this.names);
  }

  get concatenatedAddresses() {
    return this._combineWithAmpersand(this.addresses);
  }

  // e.g. ['a', 'b'] to 'a & b'
  private _combineWithAmpersand(strings: string[]): string {
    let retval = "";
    strings.forEach(str => {
      retval = retval + str + " & ";
    });
    retval = retval.substr(0, retval.length - 3); // remove ampersand after last item
    return retval;
  }
}

export class SelectClaimsTable {
  claims: SelectClaimsTableRow[];
  totalNumberOfClaims: number;
  totalValueOfClaims: number;
  averageValueOfClaims: number;

  constructor(args: SelectClaimsAPIArgs) {
    this.claims = [];
    for (let val of args.claims) {
      this.claims.push(new SelectClaimsTableRow(val));
    }
    this.totalNumberOfClaims = args.number_of_claims;
    this.totalValueOfClaims = args.total_value;
    this.averageValueOfClaims = args.total_value / args.number_of_claims;
  }

  get formattedTotalValueOfClaims(): string {
    return this._asCurrency(this.totalValueOfClaims);
  }

  get formattedAverageValueOfClaims(): string {
    return this._asCurrency(this.averageValueOfClaims);
  }

  private _asCurrency(num: number): string {
    return num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  }
}

export interface SelectClaimsAPIArgs {
  claims: SelectClaimsTableRowArgs[];
  number_of_claims: number;
  total_value: number;
}

export interface SelectClaimsGETAPIRequestArgs {
  offset: number;
  resultType: string;
  numberToGet: number;
  filterClaims: string[];
}

export interface ClaimSelectionArgs {
  selection: boolean;
}

export interface SelectClaimsPOSTAPIRequestArgs {
  [claimId: string]: ClaimSelectionArgs | boolean;
  confirmation?: boolean;
}

export interface SelectClaimsTableRowArgs {
  amount: number;
  claimId: string;
  names: string[];
  state: string;
  addresses: string[];
  reportingCompany: string;
  isSelected: boolean;
}

export class SelectClaimsTableRowCache {
  cache: SelectClaimsTableRow[][];

  constructor(numberOfPages: number) {
    this.cache = new Array<SelectClaimsTableRow[]>(numberOfPages);
  }

  setPageClaims(pageNum: number, claims: SelectClaimsTableRow[]): void {
    this.cache[pageNum] = claims;
  }

  getPageClaims(pageNum: number): SelectClaimsTableRow[] {
    return this.cache[pageNum];
  }

  isPageCached(pageNum: number): boolean {
    return this.cache[pageNum] != null;
  }

  setSelectedFlagOnClaimModel(claimId: string, isSelected: boolean): void {
    for (let i = 0; i < this.cache.length; i++) {
      if (this.cache[i]) {
        for (let j = 0; j < this.cache[i].length; j++) {
          if (this.cache[i][j].claimId === claimId) {
            this.cache[i][j].isSelected = isSelected;
            return;
          }
        }
      }
    }
  }

  setUpdatingFlagOnClaimModel(claimId: string, updating: boolean): void {
    for (let i = 0; i < this.cache.length; i++) {
      if (this.cache[i]) {
        for (let j = 0; j < this.cache[i].length; j++) {
          if (this.cache[i][j].claimId === claimId) {
            this.cache[i][j].updating = updating;
            return;
          }
        }
      }
    }
  }
}
