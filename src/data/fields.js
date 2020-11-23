import * as OPTIONS from './agency_bureau_options';

const FIELD_OPTIONS = {
    // Website
    target_url: {
        live: true,
        attribute: 'target_url',
        title: 'Target Url',
        order: 0,
        category: 'Website',
        query_type: 'equals',
        input: 'text',

    },
    target_url_domain: {
        live: true,
        attribute: 'target_url_domain',
        title: 'Target Url Domain',
        order: 1,
        category: 'Website',
        query_type: 'equals',
        input: 'text',
    },
    final_url_domain: {
        live: true,
        attribute: 'final_url_domain',
        title: 'Final URL - Base Domain',
        order: 2,
        category: 'Website',
        query_type: 'equals',
        input: 'text',
    },
    final_url_MIMETYPE: {
        attribute: 'final_url_MIMETYPE',
        title: 'Final Url MIMEType',
        order: 3,
        category: 'Website',
    },
    final_url_live: {
        live: true,
        attribute: 'final_url_live',
        title: 'Final Url is Live',
        order: 4,
        category: 'Website',
        query_type: 'boolean',
        input: 'select',
        input_options: [
            { label: 'true', value: 'true' },
            { label: 'false', value: 'false' },
        ],
    },
    target_url_redirects: {
        live: true,
        attribute: 'target_url_redirects',
        title: 'Target URL - Redirects',
        order: 5,
        category: 'Website',
        query_type: 'boolean',
        input: 'select',
        input_options: [
            { label: 'true', value: 'true' },
            { label: 'false', value: 'false' },
        ],
    },
    final_url_same_domain: {
        attribute: 'final_url_same_domain',
        title: 'Final URL/Target URL - Same Base Domain',
        order: 6,
        category: 'Website',
    },
    final_url_same_website: {
        attribute: 'final_url_same_website',
        title: 'Final URL/Target URL - Same Website',
        order: 7,
        category: 'Website',

    },
    target_url_agency_owner: {
        live: true,
        attribute: 'target_url_agency_owner',
        title: 'Target URL Base Domain - Agency Owner',
        order: 8,
        category: 'Website',
        query_type: 'equals',
        input: 'select',
        input_options: OPTIONS.AGENCY_OPTIONS,
    },
    target_url_bureau_owner: {
        attribute: 'target_url_bureau_owner',
        title: 'Target URL Base Domain - Bureau Owner',
        order: 9,
        category: 'Website',
        query_type: 'equals',
        input: 'select',
        input_options: OPTIONS.BUREAU_OPTIONS,
        live: true,
    },
    final_url_status_code: {
        attribute: 'final_url_status_code',
        title: 'Final URL - Status Code',
        order: 10,
        category: 'Website',
    },
    target_url_404_test: {
        attribute: 'target_url_404_test',
        title: 'Target URL - 404 Test',
        order: 11,
        category: 'Website',
    },
    scan_status: {
        live: true,
        attribute: 'scan_status',
        title: 'Scan Status',
        order: 12,
        category: 'Website',
        query_type: 'equals',
        input: 'select',
        input_options: [
            { label: 'Success', value: 'Success' },
            { label: 'Timeout', value: 'Timeout' },
            { label: 'Completed', value: 'Completed' },
            { label: 'DNS resolution error', value: 'DNS resolution error' },
            { label: 'General scanner error', value: 'General scanner error' },
        ],
    },
    scan_date: {
        attribute: 'scan_date',
        title: 'Scan Date',
        order: 13,
        category: 'Website',
    },

    // USWDS
    uswds_favicon_detected: {
        attribute: 'uswds_favicon_detected',
        title: 'Favicon',
        category: 'USWDS',
        order: 0,
    },
    uswds_favicon_in_css_detected: {
        attribute: 'uswds_favicon_in_css_detected',
        title: 'Favicon in CSS',
        category: 'USWDS',
        order: 1,
    },
    uswds_merriweather_font_detected: {
        attribute: 'uswds_merriweather_font_detected',
        title: 'Merriweather Font',
        category: 'USWDS',
        order: 2,
    },
    uswds_publicsans_font_detected: {
        attribute: 'uswds_publicsans_font_detected',
        title: 'Public Sans Font',
        category: 'USWDS',
        order: 3,
    },
    uswds_source_sans_font_detected: {
        attribute: 'uswds_source_sans_font_detected',
        title: 'Source Sans Font',
        category: 'USWDS',
        order: 3,
    },
    uswds_tables_detected: {
        attribute: 'uswds_tables_detected',
        title: 'Tables',
        category: 'USWDS',
        order: 4,
    },
    uswds_count: {
        attribute: 'uswds_count',
        title: 'Count',
        category: 'USWDS',
        order: 5,
    },
    uswds_usa_classes_detected: {
        attribute: 'uswds_usa_classes_detected',
        title: 'USA Classes',
        category: 'USWDS',
        order: 6,
    },
    uswds_usa_detected: {
        attribute: 'uswds_usa_detected',
        title: 'USA',
        category: 'USWDS',
        order: 7,
    },
    uswds_string_detected: {
        attribute: 'uswds_string_detected',
        title: 'String',
        category: 'USWDS',
        order: 8,
    },
    uswds_string_in_css_detected: {
        attribute: 'uswds_string_in_css_detected',
        title: 'String in CSS',
        category: 'USWDS',
        order: 9,
    },

    // DAP
    dap_detected_final_url: {
        live: true,
        attribute: 'dap_detected_final_url',
        title: 'Final URL - DAP Detected',
        category: 'Website',
        order: 0,
        query_type: 'boolean',
        input: 'select',
        input_options: [
            { label: 'True', value: 'True' },
            { label: 'False', value: 'False' },
        ],
    },
    dap_parameters_final_url: {
        attribute: 'dap_parameters_final_url',
        title: 'Parameters - Final URL',
        category: 'DAP',
        order: 1,
    },

    // Search
    og_date_final_url: {
        attribute: 'og_date_final_url',
        title: 'SEO - og:date - Final URL',
        category: 'Search',
        order: 2,
    },
    og_title_final_url: {
        attribute: 'og_title_final_url',
        title: 'SEO - og:title - Final URL',
        category: 'Search',
        order: 3,
    },
    og_description_final_url: {
        attribute: 'og_description_final_url',
        title: 'SEO - og:description - Final URL',
        category: 'Search',
        order: 4,
    },
    main_element_final_url: {
        attribute: 'main_element_final_url',
        title: 'SEO - Main Element - Final URL',
        category: 'Search',
        order: 5,
    },
    robots_txt_final_url: {
        attribute: 'robots_txt_final_url',
        title: 'Robots.txt - Final URL',
        category: 'Search',
        order: 6,
    },
    robots_txt_final_url_live: {
        attribute: 'robots_txt_final_url_live',
        title: 'Robots.txt - Final URL - Live',
        category: 'Search',
        order: 7,
    },
    robots_txt_target_url_redirects: {
        attribute: 'robots_txt_target_url_redirects',
        title: 'Robots.txt - Target URL - Redirects',
        category: 'Search',
        order: 8,
    },
    robots_txt_final_url_filesize: {
        attribute: 'robots_txt_final_url_filesize',
        title: 'Robots.txt - Final URL - Filesize',
        category: 'Search',
        order: 9,
    },
    robots_txt_final_url_MIMEtype: {
        attribute: 'robots_txt_final_url_MIMEtype',
        title: 'Robots.txt - Final URL - MIMEtype',
        category: 'Search',
        order: 10,
    },
    robots_txt_crawl_delay: {
        attribute: 'robots_txt_crawl_delay',
        title: 'Robots.txt - Crawl Delay',
        category: 'Search',
        order: 11,
    },
    robots_txt_sitemap_locations: {
        attribute: 'robots_txt_sitemap_locations',
        title: 'Robots.txt - Sitemap Locations',
        category: 'Search',
        order: 12,
    },
    sitemap_xml_final_url_live: {
        attribute: 'sitemap_xml_final_url_live',
        title: 'Sitemap.xml - Final URL - Live',
        category: 'Search',
        order: 13,
    },
    sitemap_xml_target_url_redirects: {
        attribute: 'sitemap_xml_target_url_redirects',
        title: 'Sitemap.xml - Target URL - Redirects',
        category: 'Search',
        order: 14,
    },
    sitemap_xml_final_url_filesize: {
        attribute: 'sitemap_xml_final_url_filesize',
        title: 'Sitemap.xml - Final URL - Filesize',
        category: 'Search',
        order: 15,
    },
    sitemap_xml_final_url_MIMEtype: {
        attribute: 'sitemap_xml_final_url_MIMEtype',
        title: 'Sitemap.xml - MIMEtype',
        category: 'Search',
        order: 16,
    },
    sitemap_xml_count: {
        attribute: 'sitemap_xml_count',
        title: 'Sitemap.xml - Items Count',
        category: 'Search',
        order: 17,
    },
    sitemap_xml_pdf_count: {
        attribute: 'sitemap_xml_pdf_count',
        title: 'Sitemap.xml - PDF Count',
        category: 'Search',
        order: 18,
    }

}

export default FIELD_OPTIONS
