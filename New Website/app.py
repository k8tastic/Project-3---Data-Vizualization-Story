import argparse

import pandas as pd
import dash
import dash_core_components as dcc
import dash_html_components as html
import dash_table
import plotly.graph_objs as pg


parser = argparse.ArgumentParser()
parser.add_argument("input")
args = parser.parse_args()
data = pd.read_excel(args.input, index_col=0)
app = dash.Dash()
app.layout = html.Div(
    children=[
        dcc.Tabs(
            id="tabs",
            children=[
                dcc.Tab(
                    label="Map",
                    children=[
                        dcc.Graph(
                            id="map",
                            figure=pg.Figure(
                                [
                                    pg.Scattergeo(
                                        locationmode="USA-states",
                                        lon=data["lgn"],
                                        lat=data["lat"],
                                        text=(
                                            "Region name: " + data["region_name"]
                                            + "<br>Principal amount: " + data["principal_amount"].astype(str)
                                            + "<br>Auction location: " + data["auction_location"].astype(str)
                                            + "<br>Date of auction: " + data["date_of_auction"].astype(str)
                                            + "<br>Auction time: " + data["auction_time"].astype(str)
                                            + "<br>Deposit: " + data["deposit"].astype(str)
                                            + "<br>Z street address: " + data["zstreet_address"].astype(str)
                                        ),
                                        hoverinfo="text",
                                        mode="markers"
                                    )
                                ],
                                pg.Layout(
                                    geo=dict(
                                        scope="usa",
                                        center=dict(
                                            lat=data["lat"].mean(), lon=data["lgn"].mean()
                                        ),
                                    )
                                )
                            )
                        )
                    ]
                ),
                dcc.Tab(
                    label="Table",
                    children=[
                        dash_table.DataTable(
                            id="table",
                            columns=[
                                {"name": col, "id": col, "deletable": False}
                                for col in data.columns
                            ],
                            data=(
                                data
                                    .astype({"date_of_auction": str})
                                    .to_dict("rows")
                            ),
                            sorting=True,
                            sorting_type="multi"
                        )
                    ]
                )
            ]
        )
        # dcc.Graph(
        #     figure=pg.Figure(
        #         [
        #             pg.Scattergeo(
        #                 locationmode="USA-states",
        #                 lon=data["lgn"],
        #                 lat=data["lat"],
        #                 text=(
        #                     "Region name: " + data["region_name"]
        #                     + "<br>Principal amount: " + data["principal_amount"].astype(str)
        #                     + "<br>Auction location: " + data["auction_location"].astype(str)
        #                     + "<br>Date of auction: " + data["date_of_auction"].astype(str)
        #                     + "<br>Auction time: " + data["auction_time"].astype(str)
        #                     + "<br>Deposit: " + data["deposit"].astype(str)
        #                     + "<br>Z street address: " + data["zstreet_address"].astype(str)
        #                 ),
        #                 hoverinfo="text",
        #                 mode="markers"
        #             )
        #         ],
        #         pg.Layout(
        #             geo=dict(
        #                 scope="usa",
        #                 center=dict(
        #                     lat=data["lat"].mean(), lon=data["lgn"].mean()
        #                 ),
        #             )
        #         )
        #     )
        # ),
        # dash_table.DataTable(
        #     columns=[
        #         {"name": col, "id": col, "deletable": False}
        #         for col in data.columns
        #     ],
        #     data=(
        #         data
        #             .astype({"date_of_auction": str})
        #             .to_dict("rows")
        #     ),
        #     sorting=True,
        #     sorting_type="multi"
        # )
    ]
)


if __name__ == "__main__":
    app.run_server()
