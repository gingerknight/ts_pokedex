export type CacheEntry<T> = {
  createdAt: number; // Date.now() epoch
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(number: number) {
    this.#interval = number;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T): void {
    this.#cache.set(key, { createdAt: Date.now(), val } as CacheEntry<T>);
  }

  get<T>(key: string) {
    const val = this.#cache.get(key);
    if (val !== undefined) {
      return val.val as T;
    }
    return undefined;
  }

  #reap() {
    this.#cache.forEach((cacheVal, key) => {
      if (cacheVal.createdAt < Date.now() - this.#interval) {
        this.#cache.delete(key);
        //console.log(`Cleaned up entry: ${key}`);
      }
    });
  }

  #startReapLoop(): void {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }

  stopReapLoop(): void {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
