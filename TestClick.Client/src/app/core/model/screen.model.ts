
export interface mScreen
{
    id: number;
    tenantId? : number;
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

export interface mScreenFilter
{
    statusIdList?: number[];
    placementTypeIdList?: number[];
    typeIdList?: number[];
}