export class BoardConfiguration{
    constructor(
        public name: string = '',
        public slots: number = 0,
        public results: string[] = [],
        public colors: string[] = [],
        public positionToId: number[] = []
    ){}
}