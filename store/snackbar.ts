import { Subject } from 'rxjs';

const subject = new Subject();

const snackbarStore = {
  init: () => {
    subject.next(false);
  },
  subscribe: (setState: any) => subject.subscribe(setState),
  showSnackbar: () => {
    subject.next(true);
  },
};

export default snackbarStore;
