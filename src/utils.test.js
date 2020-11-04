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
