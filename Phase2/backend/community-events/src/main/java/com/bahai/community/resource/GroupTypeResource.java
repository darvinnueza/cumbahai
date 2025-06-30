package com.bahai.community.resource;

import java.util.List;
import jakarta.ws.rs.*;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.MediaType;
import jakarta.transaction.Transactional;
import com.bahai.community.resource.dto.*;
import com.bahai.community.service.GroupTypeService;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/api/v1/groupTypes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "GroupType", description = "Operations related to GroupType")
public class GroupTypeResource {

    @Inject
    GroupTypeService service;

    @GET
    public Response findAll() {
        try {
            List<GroupTypeResponse> groupTypes = service.findAll();
            ApiResponse<List<GroupTypeResponse>> response = new ApiResponse<>(
                    "success",
                    groupTypes,
                    "Tipos de Grupos obtenidos exitosamente"
            );
            return Response.ok(response).build();
        } catch (Exception ex) {
            return internalError("No se pudieron obtener los Tipos de Grupos", "GROUP_TYPES_LIST_FAILED");
        }
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Long id) {
        try {
            GroupTypeResponse groupType = service.findById(id);
            if (groupType == null) {
                return notFound("Tipo de Grupo no encontrado", "GROUP_TYPES_NOT_FOUND");
            }
            ApiResponse<GroupTypeResponse> response = new ApiResponse<>(
                    "success",
                    groupType,
                    "Tipo de Grupo obtenido exitosamente"
            );
            return Response.ok(response).build();
        } catch (Exception ex) {
            return internalError("No se pudo obtener el Tipo de Grupo", "GROUP_TYPES_FETCH_FAILED");
        }
    }

    @POST
    @Transactional
    public Response create(GroupTypeRequest request) {
        try {
            GroupTypeResponse groupType = service.save(request);
            ApiResponse<GroupTypeResponse> response = new ApiResponse<>(
                    "success",
                    groupType,
                    "Tipo de Grupo creado exitosamente"
            );
            return Response.status(Response.Status.CREATED).entity(response).build();
        } catch (Exception ex) {
            return internalError("No se pudo crear el Tipo de Grupo", "GROUP_TYPES_CREATION_FAILED");
        }
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, GroupTypeRequest request) {
        try {
            GroupTypeResponse groupType = service.update(id, request);
            if (groupType == null) {
                return notFound("Tipo de Grupo no encontrado", "GROUP_TYPES_NOT_FOUND");
            }
            ApiResponse<GroupTypeResponse> response = new ApiResponse<>(
                    "success",
                    groupType,
                    "Tipo de Grupo actualizado exitosamente"
            );
            return Response.ok(response).build();
        } catch (Exception ex) {
            return internalError("No se pudo actualizar el Tipo de Grupo", "GROUP_TYPES_UPDATE_FAILED");
        }
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        try {
            boolean deleted = service.delete(id);
            if (!deleted) {
                return notFound("Tipo de Grupo no encontrado", "GROUP_TYPES_NOT_FOUND");
            }
            ApiResponse<Void> response = new ApiResponse<>(
                    "success",
                    null,
                    "Tipo de Grupo eliminado exitosamente"
            );
            return Response.ok(response).build();
        } catch (Exception ex) {
            return internalError("No se pudo eliminar el Tipo de Grupo", "GROUP_TYPES_DELETE_FAILED");
        }
    }

    // Utilidades comunes para errores
    private Response notFound(String message, String code) {
        ApiErrorResponse error = new ApiErrorResponse("error", message, code);
        return Response.status(Response.Status.NOT_FOUND).entity(error).build();
    }

    private Response internalError(String message, String code) {
        ApiErrorResponse error = new ApiErrorResponse("error", message, code);
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
    }
}