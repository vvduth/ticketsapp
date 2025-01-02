interface Ticket {
    id: string;
    title: string;
    price: number;
    date: Date;
}

const sampleTicket: Ticket = {
    id: '1',
    title: 'UFC 312',
    price: 100,
    date: new Date()
};

console.log(sampleTicket);

export default sampleTicket;