/**
 * @prettier
 * @flow
 */

/* eslint-disable import/no-extraneous-dependencies */
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jsdom from 'jsdom';
import 'jest-localstorage-mock';
/* eslint-enable import/no-extraneous-dependencies */

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

global.navigator = {
  userAgent: 'node.js',
};

Enzyme.configure({adapter: new Adapter()});
