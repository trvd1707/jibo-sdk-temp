'use babel';

import JiboSdkView from './jibo-sdk-view';
import { CompositeDisposable } from 'atom';

export default {

  jiboSdkView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.jiboSdkView = new JiboSdkView(state.jiboSdkViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.jiboSdkView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jibo-sdk:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.jiboSdkView.destroy();
  },

  serialize() {
    return {
      jiboSdkViewState: this.jiboSdkView.serialize()
    };
  },

  toggle() {
    console.log('JiboSdk was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
