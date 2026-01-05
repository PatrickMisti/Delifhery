import {SubSink} from 'subsink';
import {SubscriptionLike} from 'rxjs';
import {Nullable} from 'subsink/dist/subsink';

export class Disposabled {
  private _subSink = new SubSink();

  protected set subSink(stream: Nullable<SubscriptionLike>) {
    this._subSink.sink = stream;
  }

  dispose(): void {
    this._subSink.unsubscribe();
  }
}
