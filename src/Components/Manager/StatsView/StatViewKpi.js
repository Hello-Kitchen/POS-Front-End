import { Skeleton, Typography } from "@mui/material";
import React from "react";
import PropTypes from 'prop-types';

/**
 * Displays a KPI card with one value.
 * 
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.title - The title displayed at the top of the card.
 * @param {React.ReactNode} props.value - The KPI value to display.
 * @param {boolean} props.loading - If true, shows a loading skeleton for the value.
 * @returns {JSX.Element} The rendered KPI card.
 */
function StatViewKpiOneValue({ title, value, loading }) {
    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-200 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <Typography variant="h4" className="text-center">
                {loading ? (
                    <Skeleton animation="wave" width={50}/>
                ) : (
                    value
                )}
            </Typography>
        </div>
    );
}

/**
 * Displays a KPI card with two values, each with its own description and loading state.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.title - The title displayed at the top of the card.
 * @param {React.ReactNode} props.valueOne - The first KPI value to display.
 * @param {React.ReactNode} props.valueTwo - The second KPI value to display.
 * @param {string} props.descOne - Description for the first KPI value.
 * @param {string} props.descTwo - Description for the second KPI value.
 * @param {boolean} props.loadingOne - If true, shows a loading skeleton for the first value.
 * @param {boolean} props.loadingTwo - If true, shows a loading skeleton for the second value.
 * @returns {JSX.Element} The rendered KPI card with two values.
 */
function StatViewKpiTwoValues({ title, valueOne, valueTwo, descOne, descTwo, loadingOne, loadingTwo }) {
    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-200 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col items-center">
                    <Typography variant="h4" className="text-center">
                        {loadingOne ? (
                            <Skeleton animation="wave" width={50}/>
                        ) : (
                            valueOne
                        )}
                    </Typography>
                    <p className="text-sm text-gray-600">{descOne}</p>
                </div>
                <div className="flex flex-col items-center">
                    <Typography variant="h4" className="text-center">
                        {loadingTwo ? (
                            <Skeleton animation="wave" width={50}/>
                        ) : (
                            valueTwo
                        )}
                    </Typography>
                    <p className="text-sm text-gray-600">{descTwo}</p>
                </div>
            </div>
        </div>
    );
}

StatViewKpiOneValue.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    loading: PropTypes.bool.isRequired,
};

StatViewKpiTwoValues.propTypes = {
    title: PropTypes.string.isRequired,
    valueOne: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    valueTwo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    descOne: PropTypes.string.isRequired,
    descTwo: PropTypes.string.isRequired,
    loadingOne: PropTypes.bool.isRequired,
    loadingTwo: PropTypes.bool.isRequired,
};

export { StatViewKpiOneValue, StatViewKpiTwoValues };