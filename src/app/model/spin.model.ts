export class Spin{
    constructor(
        public uuid: string = '00000000-0000-0000-0000-000000000000',
        public id: number = 0,
        public startTime: Date = new Date(),
        public startDelta: number = 0,
        public startDeltaUs: number = 0,
        public fakeStartDelta: number = 0,
        public duration: number = 0,
        public result: number = 0,
        public outcome: string = ''
    ){}
}