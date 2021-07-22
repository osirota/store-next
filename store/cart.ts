import { Subject } from 'rxjs';

const subject = new Subject();

const cartStore = {
  init: () => {
    const data = localStorage.getItem('cart');
    if (data) {
      subject.next(JSON.parse(data));
    } else {
      subject.next(['2']);
    }
  },
  subscribe: (setState: any) => subject.subscribe(setState),
  setCart: (cart: any) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    subject.next(cart);
  },
  clearCart: () => {
    subject.next([]);
  },
  initialState: () => {
    const data = localStorage.getItem('cart');
    if (data) {
      return JSON.parse(data);
    }
    return [];
  },
};

export default cartStore;
