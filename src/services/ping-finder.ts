import { injectable } from 'inversify'

@injectable()
export class PingFinder {
  private regexp: string = 'ping'

  public isPing(stringToSearch: string): boolean {
    return stringToSearch.search(this.regexp) >= 0
  }
}
