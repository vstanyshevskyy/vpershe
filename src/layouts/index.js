import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import './index.css'
import './media.less';

const TemplateWrapper = ({ children }) => (
	<div>
		<div>
			<Helmet
				title="Vpershe Site"
				meta={[
					{ name: 'description', content: 'Sample' },
					{ name: 'keywords', content: 'sample, something' },
				]}
			/>
			<div style={{
					margin: '0 auto'
				}}>
				{children()}
			</div>
		</div>
	</div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
