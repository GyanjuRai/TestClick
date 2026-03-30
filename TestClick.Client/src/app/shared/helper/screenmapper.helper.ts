import { screenPlacementTypeEnum, screenTypeEnum } from "../model/enum"

export const userTyeLabel: Record<number, string> = {
    [screenTypeEnum.Analog]: 'Analog',
    [screenTypeEnum.Digital]: 'Digital'
}

export const screenPlacementTypeLabel: Record<number, string> = {
    [screenPlacementTypeEnum.Indoor]: 'Indoor',
    [screenPlacementTypeEnum.Outdoor]: 'Outdoor'
}