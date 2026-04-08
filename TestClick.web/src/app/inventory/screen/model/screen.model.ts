export interface mScreen {
  id: number;
  tenantId?: number;
  screenName: string;
  specification: string;
  country: string;
  city: string;
  placementType: number;
  placement: string;
  avgViewer: number;
  basePrice: number;
  status: number;
  type: number;
  createdBy: number;
  isDelete: boolean;
  updatedBy: number;
  updatedAt: Date;
  players?: string;
  tenantName?: string;
  screenPlayer?: string;
}

export interface mScreenIns {
  tenantId: number;
  screenName: string;
  specification: string;
  country: string;
  city: string;
  placementType: number;
  placement: string;
  avgViewer: number;
  basePrice: number;
  status: number;
  type: number;
  createdBy: number;
}

export interface mScreenUpd {
  id: number;
  screenName: string;
  specification: string;
  country: string;
  city: string;
  placementType: number;
  placement: string;
  avgViewer: number;
  basePrice: number;
  status: number;
  type: number;
  updatedBy: number;
}

export interface mScreenDel {
  id: number;
  updatedBy: number;
}

export interface mScreenFilter {
  statusIdList?: number[];
  placementTypeIdList?: number[];
  typeIdList?: number[];
}
