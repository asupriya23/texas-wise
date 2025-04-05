import React from "react";
import { Card, CardContent, Typography, CardMedia, Button, Box } from "@mui/material";

export function NewsArticle({ title, description, imageUrl, source, date }) {
  return (
    <Card sx={{ mb: 3, display: 'flex', flexDirection: 'column' }}>
      {imageUrl && (
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={title}
        />
      )}
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            {source} • {new Date(date).toLocaleDateString()}
          </Typography>
          <Button size="small" color="primary">
            Read More
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}