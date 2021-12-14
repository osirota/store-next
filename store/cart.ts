import { Subject } from 'rxjs';

const subject = new Subject();

const cartStore = {
  init: () => {
    const data = localStorage.getItem('cart');
    if (data) {
      subject.next(JSON.parse(data));
    } else {
      subject.next([]);
    }
  },
  subscribe: (setState: any) => subject.subscribe(setState),
  unsubscribe: () => subject.unsubscribe(),
  store: () => {
    console.log(
      subject.subscribe({
        next: (v) => console.log(`observerB: ${v}`),
      })
    );
  },
  setCart: (cart: any) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    subject.next(cart);
  },
  clearCart: () => {
    subject.next([]);
  },
  initialState: () => {
    const data = localStorage && localStorage.getItem('cart');
    if (data) {
      return JSON.parse(data);
    }
    return [];
  },
};

export default cartStore;
