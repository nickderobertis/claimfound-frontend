import { Injectable } from "@angular/core";
import { StorageService } from "src/app/global/storage.service";
import { from, Observable } from "rxjs";
import { NameCheckApiArgs } from "src/app/global/api/interfaces/general/name-check.interface";
import { NameCheckModel } from "./models/name-check.model";
import { PropertySearchModel } from "./models/property-search.model";
import { sleep } from "src/app/global/utils";
import { delay } from "rxjs/operators";

@Injectable()
export class MockSearchService {
  private _result: NameCheckModel;
  searchModel: PropertySearchModel;

  constructor(public storage: StorageService) {}

  search(model: PropertySearchModel): Observable<NameCheckModel> {
    this.searchModel = model;
    return from([this.result]).pipe(delay(getRandomFloat(3000)));
  }

  private get _cacheBeginKey(): string {
    return `cf-property-search-${this.searchModel.firstName}-${
      this.searchModel.lastName
    }-${this.searchModel.states.toString()}`;
  }

  private get _cacheNumberKey(): string {
    return `${this._cacheBeginKey}-number`;
  }

  private get _cacheValueKey(): string {
    return `${this._cacheBeginKey}-value`;
  }

  private _cacheMock(): void {
    this.storage.write(this._cacheNumberKey, this._result.numberOfClaims);
    this.storage.write(this._cacheValueKey, this._result.totalValue);
  }

  private _getMockFromCache(): void {
    const numberOfClaims = this.storage.read<number>(this._cacheNumberKey);
    const totalValue = this.storage.read<number>(this._cacheValueKey);
    this._result = nameCheckModelFromNumAndValue(numberOfClaims, totalValue);
  }

  private get _hasCache(): boolean {
    return this.storage.read(this._cacheNumberKey) != null;
  }

  get result(): NameCheckModel {
    if (this._hasCache) {
      this._getMockFromCache();
    } else {
      this._result = getMockResult();
      this._cacheMock();
    }
    return this._result;
  }
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * (max - 1)) + 1;
}

function getRandomFloatMin10(max: number): number {
  if (max < 10) {
    throw new Error("max above 10");
  }
  return Math.random() * (max - 10) + 10;
}

function getRandomFloat(max: number): number {
  return Math.random() * max;
}

function getMockResult(): NameCheckModel {
  const numClaims = getRandomInt(1000);

  const totalValue = getRandomFloatMin10(200 * numClaims);

  return nameCheckModelFromNumAndValue(numClaims, totalValue);
}

function nameCheckModelFromNumAndValue(
  numClaims: number,
  totalValue: number
): NameCheckModel {
  const data: NameCheckApiArgs = {
    stateWiseSplit: [
      {
        state: "FL",
        number: numClaims,
        value: totalValue,
      },
    ],
    number: numClaims,
    totalValue: totalValue,
    referralToken: "",
  };
  return new NameCheckModel(data);
}
