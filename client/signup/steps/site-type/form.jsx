/**
 * External dependencies
 */
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import Card from 'components/card';
import CountedTextarea from 'components/forms/counted-textarea';
import FormFieldset from 'components/forms/form-fieldset';
import FormLabel from 'components/forms/form-label';
import FormRadio from 'components/forms/form-radio';
import { getAllSiteTypes } from 'lib/signup/site-type';
import { recordTracksEvent } from 'state/analytics/actions';

/**
 * Style dependencies
 */
import './style.scss';

class SiteTypeForm extends Component {
	static propTypes = {
		siteType: PropTypes.string,
		submitForm: PropTypes.func.isRequired,

		// from localize() HoC
		translate: PropTypes.func.isRequired,
	};

	constructor( props ) {
		super( props );
		// eslint-disable-next-line
		this.state = {
			siteType: props.siteType,
			value: props.otherValue,
		};
	}

	handleRadioChange = event => this.setState( { siteType: event.currentTarget.value } );

	handleSubmit = event => {
		const { value, siteType } = this.state;

		event.preventDefault();

		this.props.recordTracksEvent( 'calypso_signup_actions_submit_site_type', {
			value: siteType,
		} );
		if ( value ) {
			this.setState( { siteType: [ ...this.state.siteType, value ] } );
		}
		this.props.submitForm( siteType );
	};

	onOtherCatChange = event => {
		this.setState( { value: event.target.value } );
	};

	renderRadioOptions() {
		const { translate } = this.props;
		const { value } = this.state;

		return getAllSiteTypes().map( siteTypeProperties => (
			<FormLabel
				className={ classNames( 'site-type__option', {
					'is-selected': siteTypeProperties.slug === this.state.siteType,
				} ) }
				key={ siteTypeProperties.id }
			>
				<FormRadio
					value={ siteTypeProperties.slug }
					checked={ siteTypeProperties.slug === this.state.siteType }
					onChange={ this.handleRadioChange }
				/>
				<strong className="site-type__option-label">{ siteTypeProperties.label }</strong>
				<span className="site-type__option-description">{ siteTypeProperties.description }</span>
				<span className="site-type__option-description">
					{ siteTypeProperties.slug === 'other' && (
						<CountedTextarea
							maxLength={ 60 }
							acceptableLength={ 59 }
							placeholder={ translate( 'Tell us about your website' ) }
							//		onChange={ this.onOtherCatChange }
							value={ value }
							showRemainingCharacters
						/>
					) }
				</span>
			</FormLabel>
		) );
	}

	render() {
		const { translate } = this.props;

		return (
			<div className="site-type__wrapper">
				<form onSubmit={ this.handleSubmit }>
					<Card>
						<FormFieldset>{ this.renderRadioOptions() }</FormFieldset>
						<Button primary={ true } type="submit" disabled={ ! this.state.siteType }>
							{ translate( 'Continue' ) }
						</Button>
					</Card>
				</form>
			</div>
		);
	}
}

export default connect(
	null,
	{
		recordTracksEvent,
	}
)( localize( SiteTypeForm ) );
