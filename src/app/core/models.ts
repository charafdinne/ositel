export enum MeetingRoom {
    Lisbone = "Lisbone",
    Paris = "Paris",
}

export interface Meeting {
    start:        Date;
    end:          Date;
    name:         string;
    meetingRoom:  MeetingRoom;
    participants: any[];
}
