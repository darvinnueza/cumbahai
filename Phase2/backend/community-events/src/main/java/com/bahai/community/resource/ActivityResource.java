package com.bahai.community.resource;

import java.util.List;
import jakarta.ws.rs.*;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.MediaType;
import jakarta.transaction.Transactional;
import com.bahai.community.service.ActivityService;
import com.bahai.community.resource.dto.ApiResponse;
import com.bahai.community.resource.dto.ActivityRequest;
import com.bahai.community.resource.dto.ActivityResponse;
import com.bahai.community.resource.dto.ApiErrorResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/api/v1/activities")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Activity", description = "Operations related to Activities")
public class ActivityResource {

    @Inject
    ActivityService service;

    @GET
    public Response findAll() {
        try {
            List<ActivityResponse> activities = service.findAll();
            ApiResponse<List<ActivityResponse>> response = new ApiResponse<>(
                    "success",
                    activities,
                    "Actividades obtenidas exitosamente"
            );
            return Response.ok(response).build();
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse(
                    "error",
                    "No se pudieron obtener las actividades",
                    "ACTIVITY_LIST_FAILED"
            );
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorResponse).build();
        }
    }

    @GET
    @Path("/by-event-type/{eventTypeId}")
    public Response findByEventTypeId(@PathParam("eventTypeId") Long eventTypeId) {
        try {
            List<ActivityResponse> activities = service.findByEventTypeId(eventTypeId);
            ApiResponse<List<ActivityResponse>> response = new ApiResponse<>(
                    "success",
                    activities,
                    "Actividades filtradas por tipo de evento obtenidas exitosamente"
            );
            return Response.ok(response).build();
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse(
                    "error",
                    "No se pudieron obtener las actividades por tipo de evento",
                    "ACTIVITY_LIST_BY_EVENT_TYPE_FAILED"
            );
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorResponse).build();
        }
    }

    @POST
    @Transactional
    public Response create(ActivityRequest request) {
        try {
            ActivityResponse activity = service.save(request);
            ApiResponse<ActivityResponse> response = new ApiResponse<>(
                    "success",
                    activity,
                    "Actividad creada exitosamente"
            );
            return Response.status(Response.Status.CREATED).entity(response).build();
        } catch (IllegalArgumentException e) {
            ApiErrorResponse errorResponse = new ApiErrorResponse(
                    "error",
                    e.getMessage(),
                    "ACTIVITY_VALIDATION_ERROR"
            );
            return Response.status(Response.Status.BAD_REQUEST).entity(errorResponse).build();
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse(
                    "error",
                    "No se pudo crear la Actividad",
                    "ACTIVITY_CREATION_FAILED"
            );
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorResponse).build();
        }
    }
}