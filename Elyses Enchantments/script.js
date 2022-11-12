// @ts-check
/**
 * Retrieve card from cards array at the 0-based position
 *
 * @param {number[]} cards
 * @param {number} position
 *
 * @returns {number} the card
 */
 export function getItem(cards, position) {
    return cards[position]
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
    const copyCards = [...cards]
    copyCards.splice(position, 1, replacementCard)
    return copyCards
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
    const copyCards = [...cards]
    copyCards.push(newCard)
    return copyCards
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
    const copyCards = [...cards]
    copyCards.splice(position, 1)
    return copyCards
  }
  /**
   * Remove card from the end of the cards array
   *
   * @param {number[]} cards
   *
   * @returns {number[]} the cards without the removed card
   */
  export function removeItemFromTop(cards) {
    const copyCards = [...cards]
    copyCards.pop()
    return copyCards
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
    const copyCards = [...cards]
    copyCards.unshift(newCard)
    return copyCards
  }
  /**
   * Remove card from the beginning of the cards
   *
   * @param {number[]} cards
   *
   * @returns {number[]} the cards without the removed card
   */
  export function removeItemAtBottom(cards) {
    const copyCards = [...cards]
    copyCards.shift()
    return copyCards
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