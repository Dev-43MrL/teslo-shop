import {
	AccountCircleOutlined,
	ConfirmationNumberOutlined,
} from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React, { Fragment } from "react";

export const ListItemIsLogged = () => {
	return (
		<Fragment>
			<ListItem button>
				<ListItemIcon>
					<AccountCircleOutlined />
				</ListItemIcon>
				<ListItemText primary={"Perfil"} />
			</ListItem>

			<ListItem button>
				<ListItemIcon>
					<ConfirmationNumberOutlined />
				</ListItemIcon>
				<ListItemText primary={"Mis Ordenes"} />
			</ListItem>
		</Fragment>
	);
};
