import * as utils from './utils';

describe('buildQueryParams', function() {
    const query = {
        fields: ['foo', 'bar'],
        filter_one: 'baz',
    }
    const result =  utils.buildQueryParams(query);
    it('builds param with array', () => {
        expect(result).toMatch(/fields=foo%2Cbar/);
    });
    it('builds param with single selection', () => {
        expect(result).toMatch(/filter_one=baz/);
    });
    it('builds complete query string', () => {
        expect(result).toEqual('fields=foo%2Cbar&filter_one=baz');
    });
});
describe('parseFieldParams', function() {
    it('returns an object keyed by param value', () => {
        const string = '?fields=target_url,uswds_favicon_detected';
        const result = utils.parseFieldParams(string, 'fields');
        expect(result.target_url).toBeDefined();
        expect(result.uswds_favicon_detected).toBeDefined();
    });
    it('returns an empty object when no param values are present', () => {
        const string = '';
        const result = utils.parseFieldParams(string, 'fields');
        expect(result).toEqual({});
    })
});
