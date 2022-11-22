// @ts-check
/**
 * Retrieve card from cards array at the 0-based position
 *
 * @param {number[]} cards
 * @param {number} position
 *
 * @returns {number|never} the card
 */
 export function getItem(cards, position) {
    const result = cards[position]

    if (!result) {
      throw Error('There is no card with this position')
    }
    return result
  }
  /**
   * Exchange card with replacementCard at the 0-based position
   *
   * @param {number[]} cards
   * @param {number} position
   * @param {number} replacementCard
   *
   * @returns {number[]} the cards with the change applied
   */
  export function setItem(cards, position, replacementCard) {
    return cards.map((card, index) => position === index ? replacementCard : card)
  }
  /**
   * Insert newCard at the end of the cards array
   *
   * @param {number[]} cards
   * @param {number} newCard
   *
   * @returns {number[]} the cards with the newCard applied
   */
  export function insertItemAtTop(cards, newCard) {
    return [...cards, newCard]
  }
  /**
   * Remove the card at the 0-based position
   *
   * @param {number[]} cards
   * @param {number} position
   *
   * @returns {number[]} the cards without the removed card
   */
  export function removeItem(cards, position) {
    return cards.filter((card, index) => index !== position)
  }
  /**
   * Remove card from the end of the cards array
   *
   * @param {number[]} cards
   *
   * @returns {number[]} the cards without the removed card
   */
  export function removeItemFromTop(cards) {
    const lastElementIndex = cards.length - 1
    return cards.filter((card, index) => index !== lastElementIndex)
  }
  /**
   * Insert newCard at beginning of the cards array
   *
   * @param {number[]} cards
   * @param {number} newCard
   *
   * @returns {number[]} the cards including the new card
   */
  export function insertItemAtBottom(cards, newCard) {
    return [newCard, ...cards]
  }
  /**
   * Remove card from the beginning of the cards
   *
   * @param {number[]} cards
   *
   * @returns {number[]} the cards without the removed card
   */
  export function removeItemAtBottom(cards) {
    const [_, ...rest] = cards
    return rest
  }
  /**
   * Compare the number of cards with the given stackSize
   *
   * @param {number[]} cards
   * @param {number} stackSize
   *
   * @returns {boolean} true if there are exactly stackSize number of cards, false otherwise
   */
  export function checkSizeOfStack(cards, stackSize) {
    return cards.length === stackSize
  }