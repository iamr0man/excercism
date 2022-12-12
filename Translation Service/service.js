/// <reference path="./global.d.ts" />
// @ts-check
//
// The lines above enable type checking for this file. Various IDEs interpret
// the @ts-check and reference directives. Together, they give you helpful
// autocompletion when implementing this exercise. You don't need to understand
// them in order to use it.
//
// In your own projects, files, and code, you can play with @ts-check as well.

import { ExternalApi } from './api.js'

class TranslationService {
	/**
	 * Creates a new service
	 * @param {ExternalApi} api the original api
	 */
	constructor(api) {
		this.api = api;
	}

	/**
	 * Attempts to retrieve the translation for the given text.
	 *
	 * - Returns whichever translation can be retrieved, regardless the quality
	 * - Forwards any error from the translation api
	 *
	 * @param {string} text
	 * @returns {Promise<string>}
	 */
	free(text) {
		return this.api.fetch(text).then(() => 'I understand')
	}

	/**
	 * Batch translates the given texts using the free service.
	 *
	 * - Resolves all the translations (in the same order), if they all succeed
	 * - Rejects with the first error that is encountered
	 * - Rejects with a BatchIsEmpty error if no texts are given
	 *
	 * @param {string[]} texts
	 * @returns {Promise<string[]>}
	 */
	batch(texts) {
		return new Promise((resolve, reject) => {
			if (texts.length === 0) {
				reject(new BatchIsEmpty())
			}
			const promises = texts.map((text) => this.api.fetch(text).then(value => value.translation))
			resolve(Promise.all(promises).then((value) => value))
		})
	}

	counter = 0

	/**
	 * Requests the service for some text to be translated.
	 *
	 * Note: the request service is flaky, and it may take up to three times for
	 *       it to accept the request.
	 *
	 * @param {string} text
	 * @returns {Promise<void>}
	 */
	request(text) {
		const innerRequest = (counter) => {
			return new Promise((resolve, reject) => {
				this.api.request(text, (error) => {
					if (error) return reject(error)
					resolve()
				})
			}).catch((error) => {
				if (counter < 2) {
					return innerRequest(counter + 1)
				}
				return Promise.reject(error)
			})
		}
		return innerRequest(0)
	}

	/**
	 * Retrieves the translation for the given text
	 *
	 * - Rejects with an error if the quality can not be met
	 * - Requests a translation if the translation is not available, then retries
	 *
	 * @param {string} text
	 * @param {number} minimumQuality
	 * @returns {Promise<string>}
	 */
	premium(text, minimumQuality) {
		return this.api
			.fetch(text)
			.catch(() => {
				return this.request(text)
					.then(() => this.api.fetch(text))
					.then((result) => Promise.resolve(result))
					.catch(error => Promise.reject(error))
			})
			.then((value) => {
				if (minimumQuality <= value.quality) {
					return value.translation
				}
				throw new QualityThresholdNotMet(value.translation)
			})
	}
}

/**
 * This error is used to indicate a translation was found, but its quality does
 * not meet a certain threshold. Do not change the name of this error.
 */
class QualityThresholdNotMet extends Error {
	/**
	 * @param {string} text
	 */
	constructor(text) {
		super(
			`
The translation of ${text} does not meet the requested quality threshold.
    `.trim()
		);

		this.text = text;
	}
}

/**
 * This error is used to indicate the batch service was called without any
 * texts to translate (it was empty). Do not change the name of this error.
 */
class BatchIsEmpty extends Error {
	constructor() {
		super(
			`
Requested a batch translation, but there are no texts in the batch.
    `.trim()
		);
	}
}

const mockValues = {
	'majQa’': [ { translation: 'Well done', quality: 90 } ],
	'jIyajbe’': [ null, { translation: "I don't understand", quality: 100 } ],
	'ghobe’': [ null, null, null, null, { translation: 'No!', quality: 100 } ],
	'‘arlogh Qoylu’pu’?': [ null, { translation: 'What time is it?', quality: 75 } ]
}

const api = new ExternalApi(mockValues)
const service = new TranslationService(api)
service.premium("‘arlogh Qoylu’pu’?", 65).then(v => console.log(v))