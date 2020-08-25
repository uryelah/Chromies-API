"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unknownEndPoint = (request, response) => {
    response.status(404).send({ error: "Endpoint does not exist" });
};
module.exports = unknownEndPoint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3R5cGVzLXNyYy91dGlscy9taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBTSxlQUFlLEdBQUcsQ0FDdEIsT0FBd0IsRUFDeEIsUUFBMEIsRUFDMUIsRUFBRTtJQUNGLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLHlCQUF5QixFQUFFLENBQUMsQ0FBQztBQUNsRSxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQyJ9