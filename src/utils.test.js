import * as utils from './utils';
import * as API from './data/api';

describe('deepPluck', function() {
    const obj = {
        key_one: { foo: 'one', bar: 'two' },
        key_two: { foo: 'three', bar: 'four' },
    }
    const result = utils.deepPluck(obj, 'bar');
    it('returns a flat object keyed by argument', () => {
        expect(result).toHaveProperty('key_one', 'two');
        expect(result).toHaveProperty('key_two', 'four');
    });
});
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
        const string = '?target_url=foo&uswds_favicon_detected=bar';
        const result = utils.parseFieldParams(string);
        expect(result.target_url).toBeDefined();
        expect(result.uswds_favicon_detected).toBeDefined();
    });
    it('returns an object of objects, each with a value', () => {
        const string = '?target_url=foo&uswds_favicon_detected=bar';
        const result = utils.parseFieldParams(string);
        expect(result.target_url.value).toEqual("foo");
        expect(result.uswds_favicon_detected.value).toEqual("bar");
    });
    it('returns an empty object when no param values are present', () => {
        const string = '';
        const result = utils.parseFieldParams(string, 'fields');
        expect(result).toEqual({});
    })
});
describe('buildApiUrl', function() {
    const filters = {
        filter_one: 'foo',
        filter_two: 'bar',
    }
    const result = utils.buildApiUrl(filters);
    it('starts with api domain', () => {
        expect(result).toMatch(new RegExp('^' + API.API_DOMAIN, 'i'));
    });
    it('includes api path', () => {
        expect(result).toMatch(new RegExp(API.API_PATH));
    });
    it('includes api key', () => {
        expect(result).toMatch(new RegExp(API.API_KEY));
    });
    it('ends with params', () => {
        expect(result).toMatch(/\&filter_one=foo&filter_two=bar$/i,);
    });
});
