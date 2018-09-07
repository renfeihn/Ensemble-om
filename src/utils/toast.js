import Vue from 'vue';
import Toast from '@/components/Toast'


const colors = ['success', 'info', 'error'];

const defaultOptions = {
  text: '',
  icon: 'info',
  color: 'info',
  timeout: 2000,
  dismissible: true,
};

let toastCmp = null;

function createToastCmp() {
  const cmp = new Vue(Toast);

  document.body.appendChild(cmp.$mount().$el);

  return cmp;
}

function getToastCmp() {
  if (!toastCmp) {
    toastCmp = createToastCmp();
  }

  return toastCmp;
}

function show(options = {}) {
  getToastCmp().show({
    ...defaultOptions,
    ...options
  });
}

function close() {
  getToastCmp().close();
}


function createShorthands() {
  const shorthands = {};

  colors.forEach(color => (shorthands[color] = (text, options = {}) => show({
    color,
    text,
    ...options
  })));

  return shorthands;
}

export default {
  show,
  close,
  getToastCmp,
  defaultOptions,
  ...createShorthands(),
};