import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

function infoBox({title, cases, total}) {
    return (
        <Card className="infoBox">
            <CardContent>
                <Typography  color="textSecondary">{title}</Typography>
                <h2 className="infoBox_cases">{cases}</h2>
                <Typography className="infoBox_total">{total}Total</Typography>
            </CardContent>
        </Card>
    )
}

export default infoBox
