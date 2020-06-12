import { IPlayerRadioSearch, IPlayerRadioNowPlaying } from './shared.interfaces';

export class PlayerRadioSearch implements IPlayerRadioSearch{
    constructor(
        public radioID: string = '',
        public ganreID: string = '',
        public radioName: string = '',
        public country_2_letterCode: string = '',
        public genreName: string = '',
        public streamURL: string = '',
        public logoImg: string = '',
    ){}
}

export class PlayerRadioNowPlaying implements IPlayerRadioNowPlaying {
    constructor(
        public artistName: string = '',
        public songName: string = '',
        public radioName: string = '',
        public radioID: string = '',
        public streamURL: string = '',
        public radioLogo: string = '',
        public date: Date = new Date(),
    ) { }
}