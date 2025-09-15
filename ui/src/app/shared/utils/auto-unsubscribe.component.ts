import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export abstract class AutoUnsubscribeComponent {
  private readonly destroyRef = inject(DestroyRef);
  protected autoDestroy<T>() {
    return takeUntilDestroyed<T>(this.destroyRef);
  }
}
