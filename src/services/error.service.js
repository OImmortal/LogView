import makeRequest from './make-request';

/**
 * Error service wrapper around the project's makeRequest helper.
 *
 * Assumption: API base path for errors is `/api/errors`.
 * If your backend uses a different route, update BASE_PATH accordingly.
 *
 * Functions:
 *  - fetchErrors(params)           => GET /api/errors?...
 *  - fetchErrorById(id)           => GET /api/errors/:id
 * 
 */

const BASE_PATH = '/api/errors'; // <-- change if your backend uses another path

export async function fetchErrors(params = {}) {
	// params: object that will be serialized into querystring
	return makeRequest(BASE_PATH, 'GET', params);
}

export async function fetchErrorById(id) {
	if (!id) throw new Error('fetchErrorById requires an id');

	const url = `${BASE_PATH}/${encodeURIComponent(id)}`;

	return makeRequest(url, 'GET');
}

export async function closeError(id, payload = {}) {
    if (!id) throw new Error('closeError requires an id');
    const url = `/api/error/${encodeURIComponent(id)}/close`;
    return makeRequest(url, 'POST', {}, {}, payload);
}

export async function archiveError(id, payload = {}) {
    if (!id) throw new Error('archiveError requires an id');
    const url = `/api/error/${encodeURIComponent(id)}/archive`;
    return makeRequest(url, 'POST', {}, {}, payload);
}

export function devMock() {
    return {
        id: 'err-0000-1111-2222-3333',
        timestamp: "2023-10-27 14:22:10 UTC",
        state: "CRITICAL",
        title: "Recurrent Connection Timeout",
        stack: {
            'runtime': "Node.js v18.x",
            'database': "MongoDB 6.0"   
        },
        related_docs: {
            'node': "http://node.docs",
            'mongo': "http://mongo.docs"
        },
        agent_url: "https://gemini.google.com/share/8d76d03a9186",
        suggestion: "Analisei o erro err-0000-1111-2222-3333. O problema parece ser no pool de conexões do MongoDB. Recomendo aumentar o maxPoolSize para 50."
    }
}

export default {
    fetchErrors,
    fetchErrorById,
    closeError,
    archiveError,
    devMock,
};
